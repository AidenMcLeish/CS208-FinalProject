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

If server/API unreachable: 

Claude assisted with sanitization, pagination (cite later)
for pagination, tried making results disappear when next button clicked as opposed to making actual page links (didn't know how to do that)