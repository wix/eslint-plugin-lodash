# Prevent use of deperectaed or future deprecations

## Rule Details

This rule takes two arguments.

* severity
* array of lodash versions e.g. [4,5]

As of now we are supporting version 4 and version 5, for deprecations list please refer [lodash wiki](https://github.com/lodash/lodash/wiki/Deprecations, 'lodash wiki').

## Which version to use

* if you are working on v3,v4 you can use [4,5] so migration becomes easy
* Assume you migrated to v5 then you should only use [5] as using version 4 doesn't make sense.
