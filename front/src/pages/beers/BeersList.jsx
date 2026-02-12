import { useEffect, useState } from "react"
import { fetchBeers, patchBeer } from "../../api/apiBiere"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import { CardBeer } from "../../components/domain/CardBeer"
import { Button } from "../../components/ui/button"

const BeersList = () => {
  const [beers, setBeers] = useState([])

  useEffect(() => {
    const loadBeers = async () => {
      try {
        const data = await fetchBeers()
        setBeers(data)
      } catch (err) {
        console.error("Failed to fetch beers:", err)
      }
    }
    loadBeers()
  }, [])

  const handleDisable = async (id) => {
    try {
      await patchBeer(id, { active: false })
      setBeers(beers.map(b => b.id === id ? { ...b, active: false } : b))
    } catch (err) {
      console.error("Failed to disable beer:", err)
    }
  }

  const handleEnable = async (id) => {
    try {
      await patchBeer(id, { active: true })
      setBeers(beers.map(b => b.id === id ? { ...b, active: true } : b))
    } catch (err) {
      console.error("Failed to enable beer:", err)
    }
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Link to="/bieres/new">
          <Button asChild>
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Ajouter une bière
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {beers.map(beer => (
          <CardBeer
            key={beer.id}
            beer={beer}
            onDisable={() => handleDisable(beer.id)}
            onEnable={() => handleEnable(beer.id)}
            onView={() => console.log("Voir bière", beer.id)}
          >
            <p>Degrés d'alcool: {beer.degree}°</p>
            <p>Prix: {beer.price}€</p>
          </CardBeer>
        ))}
      </div>
    </div>
  )
}

export default BeersList
