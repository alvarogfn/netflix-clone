# Top Priority/Metrics logic of the application

I implemented a view counting system based on the user's viewing history.

## Genre preference table

Users have a preference table of genres, based on the movies they've seen that contain that genre.

| Action | Adventure | Romance |
|--------|-----------|---------|
|    0   |     0     |    0    |

:::tip
This table is saved in the users document, inside indexedb.
:::

This table is responsible for the order in which the genres will appear on the application's home screen. Genres with the highest numbers will appear first.

## Most viewed genres on the Metrics View

Each document that contains a respective genre contains a view counter that increments whenever a user watches a movie that contains that genre.

Documents with the highest counters will appear first in the metrics view.

## Order of movies within the genre listing

The document containing the movies also has a view counter. This counter is responsible for the order in which movies appear from left to right in the listings.
This view counter is also responsible for the 'Top USA' on the metrics screen. Movies with the most views appear first.

## Rank of users who watched the most movies

This tank was built from the number of occurrences that this user has, as a foreign key, in the history document, saved in indexedb.

:::info
I've also implemented a system where duplicate views are not counted.

Each user and movie can only have a single occurrence in the history table, and from there all other accountings are made.
:::

:::tip
How the database works is explained further in [database](./database.md).
:::
