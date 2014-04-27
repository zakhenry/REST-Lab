TODO Items
==========
Add items as they come up, <del>strikethrough</del> when done
-----------------------------------------------------

Features
--------
* <del>Convert href attributes to a state goto directive</del>
* <del>Create the chrome.storage binding (watch for changes and update - throttle?)</del>
* Make mocks service interpret the storage and create dummy responses
* Make the watcher on the chromeStorage service fire less often for performance


Bugs
----
* Endpoints are binding to the form, so just created endpoint gets overwritten (refactor to service?)
* Work out how to handle travis-ci build with PhantomJS knowing nothing about the chrome global var