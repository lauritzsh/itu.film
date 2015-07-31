# Implementation
My WordPress page is available at [lhil.frwaw.itu.dk](http://lhil.frwaw.itu.dk/).

OBS: a (local) server is *required* for running the local files. All links
points to root (/) so it'll look broken if you just open the index.html files.
Use something like LAMP, MAMP, WAMP, XAMPP for a local server.

You'll want to use the `dist` directories and not `source` on your local server
to see the website.

## Part 2 - Design Implementation
I wanted to use tools I would likely use given a real-world project and trying
out some methodologies so I had a consistent and structured way of working.

All tools are open-source and hosted on GitHub.  
I'll list all the tools and methodologies I have been using and after that for
each a reason I'm using it.

* Tools

| Website                             | Project                                           |
| ----------------------------------- | ------------------------------------------------- |
| [Sass (SCSS)](http://sass-lang.com) | [GitHub](https://github.com/sass/sass)            |
| [Compass](http://compass-style.org) | [GitHub](https://github.com/Compass/compass)      |
| [Susy](http://susy.oddbird.net)     | [GitHub](https://github.com/ericam/susy/)         |
| scss-lint                           | [GitHub](https://github.com/brigade/scss-lint)    |
| Autoprefixer                        | [GitHub](https://github.com/postcss/autoprefixer) |

* Methodologies

| Website                                                                                                        |
| -------------------------------------------------------------------------------------------------------------- |
| [SMACSS](https://smacss.com)                                                                                   |
| [BEM (Harry Roberts' version)](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) |

### Why Sass?
The greatest benefit of Sass is the modularity. Being able to split CSS up into
multiple files and concatenate them all into one (fewer HTTP requests). This
makes it possible to re-use modules and gives a much better overview of the
styling for the project.

Also being able to use variables is great, so you can re-use the same color and
only have to change it one place to update the entire site's color for example.

### Why Compass?
Provides a few usable [mixins](http://sass-lang.com/guide). For example makes it
possible to use math such as power/exponent. Can also watch for file changes and
automatically convert the Sass (SCSS) files to a single CSS file.

### Why Susy?
Makes grid work much easier. Very powerful but I use it only to specify 12
columns and set the width/span of my modules.

### Why scss-lint?
To keep the code consistent across the whole project. It's a set of rules that
must be respected or else it'll provide a warning. Can be very useful in
combination with build tools and working with others for example.

### Why Autoprefixer?
No need to manually type out all vendor-prefixes. Autoprefixer will
automatically add necessary vendor-prefixes based on caniuse.com. Using
Autoprefixer there is no reason to check for vendor-prefixes manually and keep
track of supporting browsers.

### Why SMACSS?
It's a methodology to help keep things scalable and modular and find reusable
components. A component is either a layout (header), module (votebox), state
(active link), theme (dark or white) or base (font-size, links).  
Works great with Sass to keep it modular in correct folders.

### Why BEM?
Naming convention and guideline for CSS-selectors. Splits selectors into

```css
.block           / * Navbar */
.block__element  / * Link in navbar */
.block--modifier / * The visited link in navbar */
```

This makes it much easier to define what's a module and what elements a block
consist of. The clarity definitely out-weight its verbosity.

### What about bloat?!
I know, I had this worry myself. Using BEM blocks tends to become quite verbose.
For example `header__nav__list__item` inside `header__nav__list`. Then there is
the same media query repeated over and over in the outputted CSS. Surely this
must bloat the CSS and give us a huge file, making the page slower?

Not necessarily. The requirement for this assignment is working in the newest
Chrome which supports
[gzip](http://betterexplained.com/articles/how-to-optimize-your-site-with-gzip-compression/).
This will compress everything duplicated resulting in a small file. I assume the
server supports gzip as well.

Some [tests](http://aaronjensen.github.io/media_query_test/) were done and
[it didn't seem to matter
really](http://sasscast.tumblr.com/post/38673939456/sass-and-media-queries).

### What works on WordPress (its dashboard)?

* Header text can be changed
* Menu items can be changed
* Home
    * All information for featured movie (except recommendations) can be changed
    * Upcoming events are pulled based on the **upcoming_events** post category
* Events
    * Events are all posts from all categories
    * Shows title, date and excerpt from the post
* Who
    * About ITU.Film can be changed
* Search
    * Can expand a movie (concept, click the Chappie (#2) poster to see)
    * Banner text can be changed


#### What's missing?

* Can't change logo or Arnold (only in CSS)
* Votebox is hardcoded
* Movies in Search page are all hardcoded
* Filter in Search page not working (but I have a working demo [here](http://lhil.frwaw.itu.dk/filter-demo/))
* Can't display a single post (no wireframe/mockup for this page so I skipped it)
* Can't add new generic page (no need for this really)
* Members are hardcoded (a plugin is probably needed for this)

Primary reason for not having implemented those feature is lack of PHP
knowledge, so instead they are hardcoded to show the concept.

One problem I have with WordPress is defining class on generated elements. For
example the navigation menu doesn't look right on the mobile, since it's not
styled with the correct classes. Haven't really been able to do much about that
(lack of PHP/WordPress knowledge).
