# ember-cashay-twiddle-demo

This is a wrapper addon for [ember-cashay](https://github.com/dustinfarris/ember-cashay)!

[See it live!](https://ember-twiddle.com/f2a8a4123c65c4871a885444978efe65?openFiles=components.users-list.js%2C&route=%2Fusers)


## Why a wrapper addon?

When you add an addon to Twiddle (in twiddle.json), it checks S3 for an exact match of desired ember version and addon version.  If this is the first time seen your addon, or this particular addon/ember version pair, has been seen, Twiddle spawns a Docker container (via Amazon ECS) that installs the addon in a _blank Ember project_.  The project is then built and persisted to Amazon S3.  That's the end of the story.  Any usage of the addon from that point on will reference the pre-built resource (whatever ended up in vendor.js).

For simple addons, this works out great: the addon is only built once, so reloads are fast since Twiddle is _only reloading the application code_.

However, for more complex addons—any addon that affects the build itself (via broccoli and friends)—this is problematic.  The vanilla project with the addon is built without any notion of an app-specific config, file structure, assets, etc.  It can then be confusing to add the addon to Twiddle, adjust an ENV config, or add files that your addon should move or transform, and see _nothing change._

The workaroundish for this is an addon _wrapper_.  The wrapper adds a default blueprint that injects "app-specific" files and configs.  While these injected files and configs _will not be modifyable_ in Twiddle, it at least gives us the ability to create a demo of our addons without hacking the crap out of the addon itself.


## Specifically

- This addon specifies a default blueprint
- The default blueprint brings in the target addon via `addPackagesToProject`
- The default blueprint creates files (that will be consumed by the target addon's build via `treeForApp`).  These files are specific to a scenario appropriate for a Twiddle demonstration

