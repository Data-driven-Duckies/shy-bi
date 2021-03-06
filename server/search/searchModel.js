/* ---------------- * SERVER/SEARCH/SEARCHMODEL.JS * ----------------
 *
 * This file contains methods that interact with Neo4J API.
 *
 * Methods in this file are:
 *
 *  1) GET ALL : getAll(callback)
 *  2) GET MATCHES : getFilteredUsers({ age = '^\\d.*', city = '^\\w.*', sex = '^\\w.*' }, callback)
 *
 * --------------------------------------------------------------- */
const db = require('../database/config');

module.exports = {
  //
  /* ------------------------- * GET ALL * -------------------------
   *
   * Get all users from the database
   *
   *  Parameters:
   *    • callback | Function | Exectued on the result of db query.
   *
   *  Returns:
   *    • the result db query which resolves into a promise that
   *        executes the callback.
   *
   * --------------------------------------------------------------- */

  getAll(callback) {
    console.log('2) [searchModel.js/getAll] Accessing user database');

    return db
      .run(
        `MATCH (user:User)
        MATCH (user)-[]->(city:City)
        MATCH (user)-[]->(age:Age)
        MATCH (user)-[]->(sex:Sex)
        RETURN age, user, city, sex LIMIT 100`)
      .then(({ records }) => {
        db.close();
        console.log('3) [searchModel.js/getAll] Reteriving first 10 user data');
        return callback(records);
      })
      .catch((error) => {
        console.error('3) [userModel.js/addUser] Could not execute the query to the database');
        throw error;
      });
  },

  //
  /* ------------------------- * GET MATCHES * -------------------------
   *
   * Find all user with matching relation
   *
   *  Parameters:
   *    • age | String | Default: regEx pattern
   *    • city | String | Default: regEx pattern
   *    • sex | String | Default: regEx pattern
   *    • callback | Function | Exectued on the result of db query.
   *
   *  Returns:
   *    • the result db query which resolves into a promise that
   *        executes the callback.
   *
   * --------------------------------------------------------------- */

  getFilteredUsers({ minage = 19, maxage = 100, city = '^\\w.*', sex = '^\\w.*' }, callback) {
    console.log(`2) [searchModel.js/getFilteredUsers] Accessing user database
      age: ${minage} < age < ${maxage}
      city: ${city},
      sex: ${sex}
    `);

    return db
      .run(
        `MATCH (user:User)
        MATCH (user)-[:YEARS_OLD]->(age:Age)
        	WHERE toInt({minage}) < toInt(age.age) < toInt({maxage})
        MATCH (user)-[:LIVES_IN]->(city: City)
          WHERE city.name =~ {city}
        MATCH (user)-[:MEMBER_OF]->(sex: Sex)
          WHERE sex.sex =~ {sex}
        RETURN user, age, city, sex LIMIT 100`,
        { minage, maxage, city, sex })
      .then(({ records }) => {
        db.close();

        console.log(`3) [searchModel.js/getFilteredUsers] Reteriving first 10 user data that matches
          minage: ${minage}, maxage: ${maxage} city: ${city}, sex: ${sex}`);
        return callback(records);
      })
      .catch((error) => {
        console.error(`3) [userModel.js/getFilteredUsers] Could not user with
          ${minage}, ${maxage}, ${city}, ${sex} in database`);
        throw error;
      });
  },

  getLikedUsers({ username }, callback) {
    console.log('2) [searchModel.js/getLikedUsers] Accessing user database');

    return db
      .run(
        `MATCH (me:User{username: {username}})
        MATCH (me)-[:LIKES]->(liked:User)
        MATCH (liked)-[]->(city:City)
        MATCH (liked)-[]->(age:Age)
        MATCH (liked)-[]->(sex:Sex)
        RETURN liked, age, city, sex`,
        { username })
      .then(({ records }) => {
        db.close();

        console.log('3) [searchModel.js/getLikedUsers] Reteriving liked users data');
        return callback(records);
      })
      .catch((error) => {
        console.error(`3) [userModel.js/getLikedUsers] Could not find liked users for ${username}`);
        throw error;
      });
  },
};
