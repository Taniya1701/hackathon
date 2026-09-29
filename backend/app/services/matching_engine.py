def calculate_match_score(product, requirement):
    score = 0

    # Product name match
    if product.name.lower() == requirement.product_name.lower():
        score += 40

    # Price match
    if product.price <= requirement.budget:
        score += 30

    # Location match
    if product.location.lower() == requirement.location.lower():
        score += 20

    # Producer has stock
    if product.available_quantity > 0:
        score += 10

    return score


def find_matches(products, requirement):
    matches = []

    for product in products:

        # Wrong product
        if product.name.lower() != requirement.product_name.lower():
            continue

        # Too expensive
        if product.price > requirement.budget:
            continue

        # No stock
        if product.available_quantity <= 0:
            continue

        score = calculate_match_score(
            product,
            requirement
        )

        matches.append({
            "producer_id": product.id,
            "producer_name": product.producer_name,
            "product_name": product.name,
            "available_quantity": product.available_quantity,
            "price": product.price,
            "location": product.location,
            "match_score": score
        })

    # Highest score first
    matches.sort(
        key=lambda x: x["match_score"],
        reverse=True
    )

    return matches


def allocate_quantity(matches, required_quantity):

    remaining_quantity = required_quantity
    suppliers = []

    for match in matches:

        if remaining_quantity <= 0:
            break

        available = match["available_quantity"]

        allocated = min(
            available,
            remaining_quantity
        )

        suppliers.append({
            "producer_id": match["producer_id"],
            "producer_name": match["producer_name"],
            "allocated_quantity": allocated,
            "price": match["price"],
            "match_score": match["match_score"]
        })

        remaining_quantity -= allocated

    matched_quantity = (
        required_quantity - remaining_quantity
    )

    if required_quantity > 0:
        fulfillment_percentage = (
            matched_quantity / required_quantity
        ) * 100
    else:
        fulfillment_percentage = 0

    return {
        "required_quantity": required_quantity,
        "matched_quantity": matched_quantity,
        "remaining_quantity": remaining_quantity,
        "fulfillment_percentage": round(
            fulfillment_percentage,
            2
        ),
        "fully_fulfilled": remaining_quantity == 0,
        "suppliers": suppliers
    }