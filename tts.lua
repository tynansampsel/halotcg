function onLoad()
    spawnMultipleRandomMTGCards(1)
end

function spawnMultipleRandomMTGCards(count)
    for i = 1, count do
        local delay = i * 0.1 -- stagger requests to avoid flooding
        Wait.time(function()
            spawnRandomMTGCard({x = i * 2, y = 2, z = 0}) -- spread cards out
        end, delay)
    end
end

function spawnRandomMTGCard(position)
    local url = "https://halotcg.onrender.com/api/card"

    WebRequest.get(url, function(response)
        if response.is_error then
            print("Error fetching card: " .. response.error)
            return
        end

        -- Since the API only gives an image, directly use the response as the image URL
        local imageUrl = response.text  -- Assuming the response is a direct image URL.

        if imageUrl then
            spawnMTGCard(imageUrl, position)
        else
            print("No valid image URL for this card.")
        end
    end)
end

function spawnMTGCard(imageUrl, position)
    spawnObject({
        type = "CardCustom",
        position = position or {0, 2, 0},
        sound = false,
        callback_function = function(obj)
            -- Optional: apply scale or additional settings here
        end,
        custom = {
            face = imageUrl,
            back = "https://i.imgur.com/5M1fjuo.png", -- MTG card back
            width = 1,
            height = 1
        }
    })
end