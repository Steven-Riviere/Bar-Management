import { useEffect, useState } from "react"
import { fetchBars, patchBar } from "../../api/apiBar"
import { Link } from "react-router-dom"
import { CardBar } from "./components/CardBar"
import { Button } from "../../components/ui/button"

const BarsList = () => {
  const [bars, setBars] = useState([])

  useEffect(() => {
    const loadBars = async () => {
      try {
        const barsData = await fetchBars()
        setBars(barsData)
      } catch (error) {
        console.error("Failed to fetch bars:", error)
      }
    }
    loadBars()
  }, [])

  const handleDisable = async (id) => {
    try {
      await patchBar(id, { active: false })
      setBars(bars.map(bar =>
        bar.id === id ? { ...bar, active: false } : bar
      ))
    } catch (error) {
      console.error("Failed to deactivate bar:", error)
    }
  }

  const handleEnable = async (id) => {
    try {
      await patchBar(id, { active: true })
      setBars(bars.map(bar =>
        bar.id === id ? { ...bar, active: true } : bar
      ))
    } catch (error) {
      console.error("Failed to enable bar:", error)
    }
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Link to="/bars/new" className="inline-flex items-center gap-2 no-underline">
          <Button variant="add" className="hover:scale-110 transition-transform">
            Ajouter un bar
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {bars.map(bar => (
          <CardBar
            key={bar.id}
            bar={bar}
            onDisable={() => handleDisable(bar.id)}
            onEnable={() => handleEnable(bar.id)}
            onView={() => console.log("Voir bar", bar.id)}
          >
            <p className="description">
              {bar.address}<br/>
              {bar.postalCode}<br/>
              {bar.city}<br/>
              {bar.tel}<br/>
            </p>
          </CardBar>
        ))}
      </div>
    </div>
  )
}

export default BarsList
