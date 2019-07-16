---
id: query-engines
title: Query Engines
sidebar_label: Query Engines
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/big-data/query-engines.md
---

## Hive

## Pig
<center><img width=250 src="/datadocs/assets/CCT-CLOPIGRACE-0701-4.jpg"/></center>

- Pig is an abstraction built on top of MapReduce for rapid iteration and easy development.
    - Can be run in local mode for small datasets.
    - Can be run on top of TEZ (up to 10x faster)
- Pig consists of two components:
    - Pig Latin, which is a language.
    - A runtime environment, for running Pig Latin programs.
- Data transformations are explicitly encoded as data flow sequences, making them easy to write, understand, and maintain.
- Both, logical and physical plans are created to execute the Pig script.
- In contrast to Hive, it's highly-extensible with user-defined functions (UDFs)

```pig
-- Example: Find old 5-star movies

-- Load relations
ratings = LOAD '/user/maria_dev/ml-100k/u.data' AS (userID:int, movieID:int, rating:int, ratingTime:int);
metadata = LOAD '/user/maria_dev/ml-100k/u.item' USING PigStorage('|') AS (movieID:int, movieTitle:chararray, releaseDate:chararray, videoRelease:chararray, imdbLink:chararray);

-- Get the average rating of each movie, filter, and order by the release date
nameLookup = FOREACH metadata GENERATE movieID, movieTitle, ToUnixTime(ToDate(releaseDate, 'dd-MMM-yyyy')) AS releaseTime;
ratingsByMovie = GROUP ratings BY movieID;
avgRatings = FOREACH ratingsByMovie GENERATE group AS movieID, AVG(ratings.rating) AS avgRating;
fiveStarMovies = FILTER avgRatings BY avgRating > 4.0;
fiveStarsWithData = JOIN fiveStarMovies BY movieID, nameLookup BY movieID;
oldestFiveStarMovies = ORDER fiveStarsWithData BY nameLookup::releaseTime;
DUMP oldestFiveStarMovies;
```