import * as React from "react"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card"
import { Link } from "react-router-dom"

export const CardBar = ({bar, onDisable, onEnable, onView, children}) => {
  return (
    
    <Card className={`relative ${!bar.active ? "opacity-60" : ""}`}>
        <CardHeader>
            <h3 className="text-lg font-semibold">{bar.name}</h3>
            <Badge active={bar.active}/>
        </CardHeader>

        <CardContent>
            {children}
        </CardContent>

        <CardFooter>
            <div className="absolute bottom-2 right-2 flex gap-2">
                {bar.active ? (
                    <Button variant="disable" size="icon" onClick={onDisable} aria-label="désactiver le bar" title="Désactiver le bar" />
                    ) : (
                    <Button variant="enable" size="icon" onClick={onEnable} aria-label="activer le bar" title="Activer le bar" />
                    )}
                <Link to={`/bars/${bar.id}/edit`} className="inline-flex items-center gap-2">
                    <Button variant="view" size="icon" onClick={onView} aria-label="détails" title="Détails" >
                    </Button>
                </Link>
            </div>
        </CardFooter>
    </Card>
  )
}