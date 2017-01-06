/* ------------* server/recommendations/recommendationsModel.js *-----------
* methods:
*
*  1) getRecMatches:
*
*
*/

const db = require('../database/config');

module.exports = {
    /* ------------------------- * getRecMatches * ------------
   *
   * Takes the name of the currently logged in user and fetches
   * all recommended matches from the database.  'Recommended' matches
   * are generated by querying the DB for potential matches and returning
   * users who were liked by a friend separated by 1 degree.
   *
   *  Parameters:
   *    • username | String |
   *    • callback | Function | Exectued on the result of db query.
   *
   *  Returns:
   *    • the resulting db query which resolves into a promise that
   *        executes the callback.
   *
   * --------------------------------------------------------------- */

  getRecMatches({ username }, callback) {
    console.log('2) [recommendationsModel.js/getRecMatches] Accessing user database');

    return db
      .run(
        `MATCH (me:User{username: {username}})
        MATCH (me)-[:LIKES]->(a:User)<-[:LIKES]-(b:User)-[:LIKES]->(recUsers:User)
        MATCH (recUsers)-[]->(city:City)
        MATCH (recUsers)-[]->(age:Age)
        MATCH (recUsers)-[]->(sex:Sex)
        RETURN DISTINCT recUsers, city, age, sex LIMIT 20`,
        { username })
      .then(({ records }) => {
        db.close();

        console.log(`3) [recommendationsModel.js/getRecMatches] Fetching the recommended matches for username: ${username}`);
        return callback(records);
      })
      .catch((error) => {
        console.error(`3) [recommendationsModel.js/getRecMatches] Could not find any
        recommendations for username: ${username}`);
        throw error;
      });
  },
};
