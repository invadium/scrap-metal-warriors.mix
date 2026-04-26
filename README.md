# Scrap Metal Warriors

A game prototype about constructing mechs out of debris falling from outer space
and sending them to the battle.


## How to Debug

Use the following flags to highlight a system of interest:

```
--showInfo - open info panel on start (you can toggle any time with Ctrl+I)
--showJoints
--showBones
--showSolids
--showMomentum
--showActions - show names, actions and reasoning
--enableOrbitalBattle - rain down mechs for each base along with scrap metal
--traceMetals
--showBorder - for UI debug
```

You can set them directly on ```env``:

```
env.showJoints = true
```
Or just pass them in the command line:

```
jam -d --showJoints --showBones
```

