# Contributing

* Install the [EditorConfig](http://editorconfig.org/) plugin for your IDE. This
  enforces consistent settings for indent style, indent size, and other things.

## Content

* For content, use semantic characters, e.g. `’` instead of `'`, `…` instead of
  `...`.
* [Titles should be capitalised](http://english.stackexchange.com/questions/14/which-words-in-a-title-should-be-capitalized/34#34).

### Talks
* Recognised types: `slides`, `video`, `article`
* `date` should be in ISO 8601 format
* Make sure there is a corresponding author entity (we intersect by `name`)
* Your image must have an aspect ratio of 4:3 (minimum of 960x720)

### Author
* `emailAddress` is used for the Gravatar

## Git process
The `master` branch only contains sources. `gh-pages` only contains the compiled
code.

* Create a branch off of ``master``, prefixed with your initials, e.g.
  `oja-foo`.
* Commit only your changes to ``src``
* Open a Pull Request

## CSS
* When overriding properties that are either on the extended class or inherited,
  leave a comment to say whether you're unsetting or resetting the property, and
  where the original property exists, in the form of: `(Un|re)set (<selector>)`.
  This makes it explicit how classes are composed, and we will be less likely to
  forget to clean it up if the original property is removed.
* When unsetting a property, use the `unset` mixin. This polyfills the `unset`
  keyword.
