# Chapter-01: Basics

## Lesson-10: Debug UI

### Using lil-gui
1. There are different types of elements you can add to that panel:

    * *Range* —for numbers with minimum and maximum value
    * *Color* —for colors with various formats
    * *Text* —for simple texts
    * *Checkbox* —for booleans (true or false)
    * *Select* —for a choice from a list of values
    * *Button* —to trigger functions
    * *Folder* —to organize your panel if you have too many elements

2. Issue with colors:
    * We have to use *addColor* instead of *add* in case of colors because lil-gui is not able to know if you want to tweak a text, a number or a color just by the type of the property.
    * When using Dat.GUI, we have to create an intermediate object to modify material color.