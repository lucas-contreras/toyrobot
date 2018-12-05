# Toy robot

Toy robot is an application about a little robot that he can roam free around on table. This app allow you set a several command such as:

```
PLACE X, Y, FACING => Set robot initial position, this command must be the first instruction.
MOVE => Move the robot one block (if it can, of course) in direccion on his current facing
LEFT => Turn left 90 degreeds
RIGHT => Turn right 90 degreeds
REPORT => Show a report about where the robot is

FACING can be NORTH, SOUTH, EAST, WEST
```

any other commands will not accepted.

## Sample

You can copy the following sample, paste them and execute on command input.
```
PLACE 0, 2, EAST
MOVE
MOVE
LEFT
MOVE
REPORT
```
## How do we start?

Easly, first of all, download the repository and run, (npm install, of course) npm run dev-server. 
but if you already have an application just run npm run dev, this should create a dist folder with the bundle result and you can add 
into to your html file.

### Test

If you need checking out if the application works perfectly, you can run npm run jest, this command will test whole application and you
will see if have any error.

Enjoy Toy robot
