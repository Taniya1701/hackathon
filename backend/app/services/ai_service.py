def suggest_product_details(product_text):

    text = product_text.lower()

    suggestions = {
        "product_name": product_text,
        "unit": "kg"
    }

    if "mushroom" in text:
        suggestions["product_name"] = "Oyster Mushroom"
        suggestions["unit"] = "kg"

    elif "tomato" in text:
        suggestions["product_name"] = "Tomato"
        suggestions["unit"] = "kg"

    elif "honey" in text:
        suggestions["product_name"] = "Honey"
        suggestions["unit"] = "litre"

    return suggestions