module.exports = {
  getAllByUser: async function (req, res, next) {
    const db = req.app.get('db');
    let { user_id } = req.params
    console.log(user_id)
    let stories = await db.get_all_stories_by_id([parseInt(user_id, 10)]);
    for (let i = 0; i < stories.length; i++) {
      let tags = await db.get_tags_by_story_id([stories[i].story_id]);
      stories[i].tags = tags;
    }
    res.status(200).send(stories);
  },

  getStory: async function (req, res, next) {
    const db = req.app.get('db');
    const story_id = req.params.story_id;

    let story = await db.get_story_by_story_id([story_id]);
    let tags = await db.get_tags_by_story_id([story_id]);
    let events = await db.get_events_by_story_id([story_id]);

    for (let i = 0; i < events.length; i++) {
      let media = await db.get_media_by_event_id([events[i].event_id]);
      events[i].media = media;
    }

    story[0].tags = tags;
    story[0].events = events;

    res.status(200).send(story);
  },

  createStory: async function (req, res, next) {
    const db = req.app.get('db');
    const story = req.body[0];
    let event_res = [];
    let story_res = await db.create_story([story.user_id, story.story_title]);
    story_id = story_res[0].story_id * 1;
    for (let i = 0; i < story.tags.length; i++) {
      await db.create_tag([story_id, story.tags[i]]);
    }

    for (let i = 0; i < story.events.length; i++) {
      let { event_num, event_title, date, location, event_txt } = story.events[i]

      event_res = await db.create_event([story_id, event_num, event_title, date, location, event_txt]);
      event_id = event_res[0].event_id * 1;

      for (let j = 0; j < story.events[i].media.length; j++) {
        await db.create_media([event_id, story.events[i].media[j].media_ref, story.events[i].media[j].media_type]);
      }
    }

    let stories = await db.get_all_stories_by_id([story.user_id]);

    for (let i = 0; i < stories.length; i++) {
      let tags = await db.get_tags_by_story_id([stories[i].story_id]);
      stories[i].tags = tags;
    }

    res.status(200).send(stories);
  },

  updateStory: async function (req, res, next) {
    const db = req.app.get('db');
    const story_id = req.body[0].story_id;
    const story = req.body[0];

    //update story
    await db.update_story([story.user_id, story_id, story.story_title]);

    //get old tags and delete them
    await db.delete_tag([story_id]);

    //Then put in the new tags
    for (let i = 0; i < story.tags.length; i++) {
      await db.create_tag([story_id, story.tags[i].tag_str]);
    }

    //get the old events.
    const oldEvents = await db.get_events_by_story_id([story_id]);
    let oldIds = [];
    oldEvents.map(e => oldIds.push(e.event_id));

    //deleting events & media
    for (let i = 0; i < oldIds.length; i++) {
      await db.delete_event([story_id, oldIds[i]]);
    }

    //adding events
    const newEvents = story.events;
    let event_id = 0;

    for (let i = 0; i < newEvents.length; i++) {
      let { event_num, event_title, date, location, event_txt } = newEvents[i]

      event_res = await db.create_event([story_id, event_num, event_title, date, location, event_txt]);
      event_id = event_res[0].event_id * 1;

      //adding media
      for (let j = 0; j < newEvents[i].media.length; j++) {
        await db.create_media([event_id, newEvents[i].media[j].media_ref, newEvents[i].media[j].media_type]);
      }
    }

    //get data to return 
    let stories = await db.get_all_stories_by_id([story.user_id]);

    for (let i = 0; i < stories.length; i++) {
      let tags = await db.get_tags_by_story_id([stories[i].story_id]);
      stories[i].tags = tags;
    }

    res.status(200).send(stories);
  },

  deleteStory: async function (req, res, next) {
    const db = req.app.get('db');
    const story_id = req.params.story_id;
    let story = await db.get_story_by_story_id([story_id])

    //get old tags and delete them
    await db.delete_tag([story_id]);

    //get the old events.
    const oldEvents = await db.get_events_by_story_id([story_id]);
    let oldIds = [];
    oldEvents.map(e => oldIds.push(e.event_id));

    //deleting events & media
    for (let i = 0; i < oldIds.length; i++) {
      await db.delete_event([story_id, oldIds[i]]);
    }

    //delete story
    await db.delete_story(story_id);

    //get data to return
    let stories = await db.get_all_stories_by_id([story.user_id]);

    for (let i = 0; i < stories.length; i++) {
      let tags = await db.get_tags_by_story_id([stories[i].story_id]);
      stories[i].tags = tags;
    }

    res.status(200).send(stories);
  }
}