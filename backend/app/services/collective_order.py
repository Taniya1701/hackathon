def create_collective_proposal(match_result):

    suppliers = match_result["suppliers"]

    total_quantity = 0
    total_amount = 0

    supplier_details = []

    for supplier in suppliers:

        quantity = supplier["allocated_quantity"]
        price = supplier["price"]

        amount = quantity * price

        total_quantity += quantity
        total_amount += amount

        supplier_details.append({
            "producer_name": supplier["producer_name"],
            "quantity": quantity,
            "price_per_unit": price,
            "amount": amount
        })

    if total_quantity > 0:
        average_price = (
            total_amount / total_quantity
        )
    else:
        average_price = 0

    return {
        "total_quantity": total_quantity,
        "total_amount": total_amount,
        "average_price": round(
            average_price,
            2
        ),
        "suppliers": supplier_details,
        "fulfillment_percentage":
            match_result["fulfillment_percentage"],
        "fully_fulfilled":
            match_result["fully_fulfilled"]
    }