function onLoad()
    -- Replace this with the API URL that returns a PNG image
    local imageUrl = "https://halotcg.onrender.com/api/card.png"

    -- Create the card with an image from the URL
    local card = {
        name = "Card Name",  -- You can change the name here
        image = imageUrl,    -- This is the URL where the PNG is hosted
        description = "Card Description", -- Short description of the card
        width = 3,  -- Width of the card
        height = 4   -- Height of the card
    }

    -- Create the card using the parameters above
    spawnObject({
        type = "Card",
        position = {0, 3, 0},
        rotation = {0, 180, 0},
        scale = {1, 1, 1},
        color = {1, 1, 1},
        image = card.image,
        name = card.name
    })
end