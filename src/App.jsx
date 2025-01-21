import React, { useEffect, useState } from 'react'
    import axios from 'axios'
    import { FaArrowUp, FaArrowDown } from 'react-icons/fa'

    const App = () => {
      const [coins, setCoins] = useState([])
      const [loading, setLoading] = useState(true)

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(
              'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
            )
            setCoins(response.data)
            setLoading(false)
          } catch (error) {
            console.error('Error fetching data:', error)
          }
        }

        fetchData()
      }, [])

      if (loading) {
        return (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-crypto-blue"></div>
          </div>
        )
      }

      return (
        <div className="min-h-screen bg-gray-100 py-8">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-4xl font-bold text-crypto-blue mb-8 text-center">
              Crypto Price Tracker
            </h1>
            <div className="grid gap-6">
              {coins.map((coin) => (
                <div
                  key={coin.id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="w-10 h-10"
                      />
                      <div>
                        <h2 className="text-xl font-semibold">{coin.name}</h2>
                        <p className="text-gray-500">{coin.symbol.toUpperCase()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-semibold">
                        ${coin.current_price.toLocaleString()}
                      </p>
                      <div
                        className={`flex items-center justify-end space-x-1 ${
                          coin.price_change_percentage_24h > 0
                            ? 'text-crypto-green'
                            : 'text-crypto-red'
                        }`}
                      >
                        {coin.price_change_percentage_24h > 0 ? (
                          <FaArrowUp />
                        ) : (
                          <FaArrowDown />
                        )}
                        <span>
                          {coin.price_change_percentage_24h.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }

    export default App
