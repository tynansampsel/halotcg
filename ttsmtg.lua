function onLoad()
    spawnRandomMTGCard()
end

function spawnMultipleRandomMTGCards(count)
    for i = 1, count do
        local delay = i * 0.5 -- stagger requests to avoid flooding
        Wait.time(function()
            spawnRandomMTGCard({x = i * 2, y = 2, z = 0}) -- spread cards out
        end, delay)
    end
end

function spawnRandomMTGCard()
    local url = "https://api.scryfall.com/cards/random"

    WebRequest.get(url, function(response)
        if response.is_error then
            print("Error fetching card: " .. response.error)
            return
        end

        local data = JSON.decode(response.text)
        local imageUrl = nil

        imageUrl = data.image_uris.normal

        if imageUrl then
            spawnMTGCard(imageUrl)
        else
            print("No valid image URL for this card.")
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
