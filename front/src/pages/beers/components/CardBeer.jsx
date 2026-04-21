import * as React from "react"
import { Card, CardHeader, CardContent, CardFooter } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Button } from "../../../components/ui/button"

export const CardBeer = ({ beer, onDisable, onEnable, onView, children }) => {
  return (
    <Card className={!beer.active ? "opacity-60" : ""}>
      <CardHeader>
        <h3 className="text-lg font-semibold">{beer.name}</h3>
        <Badge active={beer.active} />
      </CardHeader>

      <CardContent>
        {children}
      </CardContent>

      <CardFooter>
        {beer.active ? (
          <Button variant="disable" onClick={onDisable}>Désactiver</Button>
        ) : (
          <Button variant="enable" onClick={onEnable}>Activer</Button>
        )}
        <Button variant="default" onClick={onView}>Consulter</Button>
      </CardFooter>
    </Card>
  )
}
