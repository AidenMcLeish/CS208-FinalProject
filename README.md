# CS208 Full Stack Final Project - Donut Shop Application

- Name: Aiden McLeish
- GitHub: [https://github.com/AidenMcLeish/CS208-FinalProject]
- Term: Spring 2026

## Project Description

This is my final project for CS208; it was built with node.js, Express, and MariaDB/MySQL. I built a web application for a small donut shop that allows users to view the shop's menu and history, as well as post comments/reviews to a small comment section. The web application is made up of four pages: the Landing Page, the About Us page, the Menu Page, and the Comment Page(s). Below are instructions on how to set up the project.

## Install & Create the Database

To set up the database, run the `install_db.sh` script in the setup_scripts
directory. This script will install MariaDB and start the server running.

```bash
./setup_scripts/install_db.sh
```
Once this is complete, create the initial tables by running the following command:

```bash
sudo mysql -u root -p < ./setup_scripts/create_demo_table.sql
```

## Install Dependencies

Install the required dependencies using npm:

```bash
npm install
```

## Run the Application

Start the application using the following command:

```bash
npm start
```
On Codespaces, the application will be run on port 3000, which can be accessed via the Terminal > Ports.

## Design Decisions

I created a header for use in all of the pages, which was made based off of the header in the example menu and includes the company logo, shop hours, and online ordering links. 
The company logo image also serves as a link back to the home page. This is a function that I have observed many times in real websites, and I find it very handy.

Likewise, I also created a footer for use in all of the pages. This footer has the company name, location, and contacts, as well as a link to another page (usually the home page). 
The only link to the About Us page is through the footer on the home page; this was deliberate, as I usually see the About Us pages stuffed into corners in most real websites. While this might make it marginally more difficult to find on first glance, I wanted to make this experience realistic.

One might also notice that when a comment is posted and viewed within 60 seconds, the time elapsed is not actually shown in seconds, but it defaults to "just now." This was an attempt at making the comment section more realistic, as this is a very common feature in real applications.

## Edge Cases

If server/API unreachable: Error.pug is thrown with a short message and the specific error (i.e, Not Found: 404). Raw error code was removed by removing it from error.pug, and createError had to be defined in app.js.
As well as this, when the program fails to get the database or one of the pages, a friendly "Unable to load page" (or similar message) is displayed. The header is always present, even when error.pug is loaded, and so the user always has a link back to the home-page (the link in the logo).

If a user only comments whitespace or comments an extremely long input, it is rejected client-side first using input attributes; however, this can be bypassed, and so error-handling was added to the POST function in index.js. A message is thrown by the handler and the comment section is disabled, but the user can still refresh the page to get back to it.

As for handling the double-clicking of the submit button, a short function was installed into the button where upon the first click, the button is disabled. Once the form is sent and the page refreshes, it's good to go again.

## Challenges

The pagination of the comment section was likely my greatest struggle, and after struggling with it for a while, I folded and asked Claude Code for help. At first, I attempted to create a function where only 10 comments would appear at a time, and the "next page" buttons would change which comments would appear. This didn't actually create new pages, but would just change what was output on the comments page. For the life of me, I could not get it to work properly for one irritating reason or another, and so I had to seek assistance. I'm sure there was a way for me to have eventually solved the problem my way, but the now-implemented solution was certainly simpler.
I wasn't incredibly far off, but "const currentPage = Math.max(1, parseInt(req.query.page) || 1);" was the missing piece that allowed for changing the page.

As well as this, formatting the Menu lists/tables was quite the struggle. I had a very hard time separating the menu items and their respective prices despite how simple the solution was. Oddly, each CSS property that is now part of the solution was tried at some point or another alongside some of the others, but in different combinations. Trying to apply all of the different possible solutions was like finding a lock combination through trial-and-error; it seemed as though some only worked best with others and it became difficult to figure out which ones were right and which were wrong. I got it eventually, though.

### Citations

Claude Code was used during the pagination struggle, as aforementioned. I also used it while working on the sanitation of the comments, as I was unsure as to which characters required sanitization and needed advice.