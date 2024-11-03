<div align="center">
    <img src="public/images/brand-gerawana.png" width="60%" />
    <h1>Gerawana Url Shortener</h1>
</div>

Author: **ISLA** (mangadi3859) (240040016)

## :about: What is this?

This is a services based website to shortened a long link with just a few characters. We provide fully customize url with visit tracker.

## Want to run it yourself?

You need a few pre-requisites to run this website.

-   NodeJS
-   PNPM or NPM
-   MySQL Server (you can use other databases)
-   SMTP Mailing service (this is optional but you won't be getting email for reset password OTP)
-   Your own domain (this is related to SMTP)

`.env` setup

```yaml
# MYSQL
DATABASE_URL="mysql://user:@host:port/dbname"

# https://mailtrap.io this is what i use
MAIL_HOST=""
MAIL_PORT=
MAIL_USER=""
MAIL_PASS=""
```

## :toc: Table of Contents

-   [About](#about-what-is-this)
-   [Table of Contens](#toc-table-of-contents)
-   [Routes](#routes-accessible-routes)
-   [Documentation](#doc-documentation)
    -   [Home Page](#home-home-page)
    -   [Dashboard Overview](#overview-dashbord-overview)

## :routes: Accessible Routes

```
root
├───/api
│   ├───/login          :POST
│   ├───/logout         :GET
│   ├───/register       :POST
│   ├───/reset-password
│   │   ├───/new        :POST
│   │   ├───/otp        :POST
│   │   └───/save       :POST
│   ├───/settings
│   │   └───/user
│   │       └───/edit   :POST
│   └───/short
│       ├───/create     :POST
│       ├───/delete     :POST
│       ├───/edit       :POST
│       └───/overview   :GET
│
│
├───/dashboard
│   ├───/overview
│   │
│   ├───/settings
│   │   └───/user
│   │
│   └───/shortlink
│
├───/r
│   └───/[:id]
└───/reset-password

```

## :doc: Documentation

### :home: Home Page

-   There are 4 main menus on the navbar with 5 for logged in person.
    ![home1](./_md/home1.png)

-   Form when you click it, will prompt you to logged in. otherwise will redirect you to `/dashboard/short`
    ![home2](./_md/home2.png)

-   Form login and register to start making some short urls
    ![home3](./_md/home3.png)
    ![home4](./_md/home4.png)

-   Collapsable Frequently Asked Questions
    ![home5](./_md/home5.png)

### :overview: Dashbord Overview

Everything onwards can only be accessed once someone logged in into an account.

-   In this page you get an overview of how much links do you have and how it perfomed on the last 6 months with a bar graph.
    ![overview](./_md/overview1.png)

### :shortlink: Dashboard Shortlink

-   Manage your link here.
-   Name, Total visited, and createdAt can be used to sort the table.
-   Action buttons provided for each row to `Edit`, `Delete`, and `Copy Link` the row
    ![shortlink](./_md/shortlink1.png)
