module.exports = {
  getAllByUser: async function(req, res, next){
    const db = req.app.get('db');
    const user_id = req.params.user_id;
    
    let stories = await db.get_all_stories_by_id([user_id]);

    for(let i = 0; i < stories.length; i++){
      let tags = await db.get_tags_by_story_id([stories[i].story_id]);
      stories[i].tags = tags;
    }

    res.status(200).send(stories);
  },

  getStory: async function(req, res, next) {
    const db = req.app.get('db');
    const story_id = req.params.story_id;

    let story = await db.get_story_by_story_id([story_id]);
    let tags = await db.get_tags_by_story_id([story_id]);
    let events = await db.get_events_by_story_id([story_id]);

    for(let i = 0; i < events.length; i++){
      let media = await db.get_media_by_event_id([events[i].event_id]);
      events[i].media = media;
    }

    story[0].tags = tags;
    story[0].events = events;

    res.status(200).send(story);
  }
}