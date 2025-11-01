# ESM Imports Objects: Iterate over related imports by standard object methods

Grouping ES modules in an "index" to import as a whole instead of importing each one by itself gives code some clarity, but there is more to it: the import of a group of modules returns a JS object that you can work with directly if you give it some structure.


## Example: Iterate over animal data

See it in action: https://hh-lohmann.github.io/esm-imports-objects

The [main module](mjs/main.mjs) does not import animal data from different submodules ([cat](mjs/submodule_cat.mjs), [dog](mjs/submodule_dog.mjs), [fish](mjs/submodule_fish.mjs)) directly, but via importing an [intermediate module](mjs/intermediate.mjs) that does the import of submodules with animal data.

Importing the intermediate module gives the main module an object that holds the data for all "registered" animals like an index leading to the actual data for the individual animal. Objects representing imports are [null-prototype objects], which means that they have no [instance object methods] like ".hasOwnProperty()", but are fully accessible with [static object methods] like "Object.hasOwn()" so that, in the example, animal data can be evaluated, in principle, without prior knowledge about structure, content or pure existence of data - **besides being represented by an ESM Imports Object like "intermediate"** (the way Rollup makes the bundle - see below - reflects the way that imports act as objects for JS execution). In the example a button only exists if there are properties available, and it is checked if the data for the chosen animal has a special property before accessing it.
      
Adding or deleting animals happens only in the intermediate module. The logic for doing something with animal properties in the main module is fully separated from the availability of data in the intermediate module. With direct imports to the main module, every change of available animal imports would require to change the code that accesses it, being clumsy and error prone.

Note that this approach makes lots more sense if you have more complex animal data, especially including method properties, or if the submodules do complex internal calculation to provide a simple looking data export (which may differ strongly in two submodules that expose the same data signature).

## Rollup bundle of used modules

[Rollup] bundling does with modules "in advance" what JS would do at importing: mapping the content of multiple files into one file as objects that are properties of each other (Rollup is set here for clarity of exposition to not - as it would do as a sensible default - [freeze] the import objects). See the code of the used [bundle](mjs/bundle.mjs) here.


[freeze]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
[instance object methods]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object#instance_methods
[null-prototype objects]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object#null-prototype_objects
[Rollup]: https://rollupjs.org
[static object methods]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object#static_methods