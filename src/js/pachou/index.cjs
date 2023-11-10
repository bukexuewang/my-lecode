const request = require('request');
const cheerio = require('cheerio');

request('https://movie.douban.com/top250', (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);
    const movieList = $('.grid_view li');
    movieList.each((index, element) => {
      const title = $(element).find('.title').text();
      console.log(`${index + 1}. ${title}`);
    });
  }
});