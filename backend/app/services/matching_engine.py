def _clean(text):
    return (text or "").strip().lower().replace(" ", "")


def match_suppliers(requirement, products):
    needed = requirement.required_quantity
    candidates = []

    for p in products:
        if _clean(p.name) != _clean(requirement.product_name):
            continue
        if p.unit != requirement.unit:
            continue
        if p.price > requirement.budget:
            continue
        if p.available_quantity <= 0:
            continue

        score = 60
        if _clean(p.location) == _clean(requirement.location):
            score += 30
        if requirement.budget > 0:
            score += round(10 * (1 - p.price / requirement.budget))

        candidates.append((score, p))

    candidates.sort(key=lambda item: (-item[0], item[1].price))

    remaining = needed
    suppliers = []

    for score, p in candidates:
        if remaining <= 0:
            break
        take = min(p.available_quantity, remaining)
        remaining -= take
        suppliers.append({
            "producer_name": p.producer_name,
            "product_name": p.name,
            "allocated_quantity": take,
            "unit": p.unit,
            "price": p.price,
            "location": p.location,
            "match_score": min(score, 100),
        })

    matched = needed - max(remaining, 0)
    percentage = round((matched / needed) * 100) if needed else 0

    return {
        "suppliers": suppliers,
        "matched_quantity": matched,
        "fulfillment_percentage": percentage,
        "fully_fulfilled": remaining <= 0 and needed > 0,
    }