import{_ as e,c as t,o as i,a as s}from"./app.1a3166f2.js";const u=JSON.parse('{"title":"Top Priority/Metrics logic of the application","description":"","frontmatter":{},"headers":[{"level":2,"title":"Genre preference table","slug":"genre-preference-table","link":"#genre-preference-table","children":[]},{"level":2,"title":"Most viewed genres on the Metrics View","slug":"most-viewed-genres-on-the-metrics-view","link":"#most-viewed-genres-on-the-metrics-view","children":[]},{"level":2,"title":"Order of movies within the genre listing","slug":"order-of-movies-within-the-genre-listing","link":"#order-of-movies-within-the-genre-listing","children":[]},{"level":2,"title":"Rank of users who watched the most movies","slug":"rank-of-users-who-watched-the-most-movies","link":"#rank-of-users-who-watched-the-most-movies","children":[]}],"relativePath":"architecture/metrics.md"}'),r={name:"architecture/metrics.md"},a=s('<h1 id="top-priority-metrics-logic-of-the-application" tabindex="-1">Top Priority/Metrics logic of the application <a class="header-anchor" href="#top-priority-metrics-logic-of-the-application" aria-hidden="true">#</a></h1><p>I implemented a view counting system based on the user&#39;s viewing history.</p><h2 id="genre-preference-table" tabindex="-1">Genre preference table <a class="header-anchor" href="#genre-preference-table" aria-hidden="true">#</a></h2><p>Users have a preference table of genres, based on the movies they&#39;ve seen that contain that genre.</p><table><thead><tr><th>Action</th><th>Adventure</th><th>Romance</th></tr></thead><tbody><tr><td>0</td><td>0</td><td>0</td></tr></tbody></table><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>This table is saved in the users document, inside indexedb.</p></div><p>This table is responsible for the order in which the genres will appear on the application&#39;s home screen. Genres with the highest numbers will appear first.</p><h2 id="most-viewed-genres-on-the-metrics-view" tabindex="-1">Most viewed genres on the Metrics View <a class="header-anchor" href="#most-viewed-genres-on-the-metrics-view" aria-hidden="true">#</a></h2><p>Each document that contains a respective genre contains a view counter that increments whenever a user watches a movie that contains that genre.</p><p>Documents with the highest counters will appear first in the metrics view.</p><h2 id="order-of-movies-within-the-genre-listing" tabindex="-1">Order of movies within the genre listing <a class="header-anchor" href="#order-of-movies-within-the-genre-listing" aria-hidden="true">#</a></h2><p>The document containing the movies also has a view counter. This counter is responsible for the order in which movies appear from left to right in the listings. This view counter is also responsible for the &#39;Top USA&#39; on the metrics screen. Movies with the most views appear first.</p><h2 id="rank-of-users-who-watched-the-most-movies" tabindex="-1">Rank of users who watched the most movies <a class="header-anchor" href="#rank-of-users-who-watched-the-most-movies" aria-hidden="true">#</a></h2><p>This tank was built from the number of occurrences that this user has, as a foreign key, in the history document, saved in indexedb.</p><div class="info custom-block"><p class="custom-block-title">INFO</p><p>I&#39;ve also implemented a system where duplicate views are not counted.</p><p>Each user and movie can only have a single occurrence in the history table, and from there all other accountings are made.</p></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>How the database works is explained further in <a href="./database.html">database</a>.</p></div>',16),o=[a];function n(h,c,l,d,p,m){return i(),t("div",null,o)}const w=e(r,[["render",n]]);export{u as __pageData,w as default};
