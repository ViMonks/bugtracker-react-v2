const projectList = [
    {
      "title": "Monks Test Project",
      "slug": "monks-test-project",
      "description": "This is a project description!",
      "team": "monks-test-team",
      "is_archived": false,
      "manager": "monks",
      "memberships": [
        {
          "user": "monks",
          "role": 2,
          "role_name": "Manager"
        }
      ],
      "created": "2020-11-18T12:35:25.159558-05:00",
      "modified": "2020-11-18T12:35:25.159585-05:00",
      "url": "http://localhost:8000/api/teams/monks-test-team/projects/monks-test-project/",
      "tickets_list": "http://localhost:8000/api/teams/monks-test-team/projects/monks-test-project/tickets/",
      "open_tickets": 1
    },
    {
      "title": "patch title",
      "slug": "new-project",
      "description": "patch description",
      "team": "monks-test-team",
      "is_archived": false,
      "manager": "monks",
      "memberships": [
        {
          "user": "monks",
          "role": 2,
          "role_name": "Manager"
        }
      ],
      "created": "2020-11-20T15:50:50.730158-05:00",
      "modified": "2020-11-20T16:23:02.069394-05:00",
      "url": "http://localhost:8000/api/teams/monks-test-team/projects/new-project/",
      "tickets_list": "http://localhost:8000/api/teams/monks-test-team/projects/new-project/tickets/",
      "open_tickets": 0
    },
    {
      "title": "New Project",
      "slug": "new-project-2",
      "description": "asdfasdf",
      "team": "monks-test-team",
      "is_archived": false,
      "manager": null,
      "memberships": [],
      "created": "2020-11-20T15:51:10.281612-05:00",
      "modified": "2020-11-20T15:51:10.281640-05:00",
      "url": "http://localhost:8000/api/teams/monks-test-team/projects/new-project-2/",
      "tickets_list": "http://localhost:8000/api/teams/monks-test-team/projects/new-project-2/tickets/",
      "open_tickets": 0
    },
    {
      "title": "Archived",
      "slug": "archived",
      "description": "asdfasdf",
      "team": "monks-test-team",
      "is_archived": true,
      "manager": null,
      "memberships": [],
      "created": "2020-11-20T15:51:10.281612-05:00",
      "modified": "2020-11-20T15:51:10.281640-05:00",
      "url": "http://localhost:8000/api/teams/monks-test-team/projects/archived/",
      "tickets_list": "http://localhost:8000/api/teams/monks-test-team/projects/archived/tickets/",
      "open_tickets": 0
    }
  ]

export default projectList