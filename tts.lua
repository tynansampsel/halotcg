function onLoad()
    spawnRandomMTGCard()
end

function spawnRandomMTGCard()
    local url = "http://localhost:4000/random-card-img"
    --local url = "https://halotcg.onrender.com/api/random"
    --https://cards.scryfall.io/border_crop/front/2/7/27f53bed-7075-4303-aa9e-fcca0a266e19.jpg?1692938931

    WebRequest.get(url, function(response)
        if response.is_error then
            print("Error fetching card: " .. response.error)
            return
        end

        -- Instead of raw image data, pass the URL directly if your method expects it
        if response.text then
            local imageUrl = url  -- This is the actual image URL you want
            spawnMTGCard(imageUrl)  -- Call your method with the image URL
        else
            print("No valid image data for this card.")
        end
    end)
end

function spawnMTGCard(imageUrl)
    spawnObject({
        type = "CardCustom",
        position = {0, 2, 0},
        callback_function = function(obj)
            obj.setCustomObject({
                face = imageUrl,
                back = "https://i.imgur.com/5M1fjuo.png", -- MTG card back
                width = 1,
                height = 1
            })
            obj.reload()
        end
    })
end
