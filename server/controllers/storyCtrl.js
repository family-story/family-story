module.exports = {
  getAllByUser: async function(req, res, next){
    const db = req.app.get('db');
    const user_id = req.params.id;
    
    let stories = await db.get_all_stories_by_id([user_id]);

    for(let i = 0; i < stories.length; i++){
      let tags = await db.get_tags_by_story([stories[i].story_id]);
      stories[i].tags = tags;
    }

    res.status(200).send(stories);
  }
}