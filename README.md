# Scrap Metal Warriors

A game prototype about constructing mechs out of debris falling from outer space
and sending them to the battle.


## How to Debug

Use the following flags to highlight a system of interest:

```
--showJoints
--showBones
--showSolids
--showMomentum
--showAction
```

You can set them directly on ```env``:

```
env.showJoints = true
```
Or just pass them in the command line:

```
jam -d --showJoints --showBones
```

