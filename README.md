This repository contains the backend application for [timelyn](https://timelyn.io). The frontend repository is available at [StudioLE/TimelynFrontend](https://github.com/StudioLE/TimelynFrontend).

# Timelyn

With [timelyn](https://timelyn.io) anyone can publish embedable timelines.

Find the application at [https://timelyn.io](https://timelyn.io)

## Features

Timelyn is a full feature platform to create, edit, manage and host [TimelineJS](http://timeline.knightlab.com) timelines. 

Free
- Timelyn is free for personal use and provides affordable subscription plans for high traffic and commercial websites.

Content Delivery Network
- All timelines are hosted on a global content delivery network ensuring low latency and high availability. 

Image hosting
- To make your life easier we take care of hosting your embedded images and replicate them across our CDN.

Analytics
- See how many hits your timeline receives and analyse how people interact with it.


## Roadmap / To Do

Timelyn is progressing well but there's still plenty to do. This list should give you an idea of the current state of affairs. Feel free to suggest features that you think could be useful. Either create a new issue on GitHub or contact [the creator](https://studiole.uk/contact) directly.

### Pages

Home
- [ ] Getting started 
- [ ] Examples

About 
- [ ] Name derivation: timeline, timely
- [ ] Pricing

### Application

Timelines
- [ ] Additional settings defined in embed code
- [ ] Save draft timelines
- [ ] Refine embed script 
- [ ] Present embed code to user
- [ ] Publish button + logic

Media attachments 
- [ ] Create model + controller with relationship to event/timeline
- [ ] Direct browser upload to cloudinary/imgur/s3
- [ ] Automate thumbnail creation

User settings
- [ ] Change name / email / password
- [ ] Change username?

Auth
- [ ] Password reset email + logic 
- [ ] Facebook / twitter auth?

Caching 
- [ ] Cache server side pages

Analytics
- [ ] Scrape analytics for user
- [ ] Necessary for price plan restrictions

### Admin tools

- [ ] As much as I enjoy the command line a graphical interface could be useful, particularly for analytics.

## Source

Timelyn is 100% javascript, the backend is a RESTful API powered by [Sails.js](http://sailsjs.org), the frontend is [AngularJS](https://angularjs.org) with authentication via JSON web tokens.

Frontend: [timelyn.io](https://timelyn.io)

Backend: [app.timelyn.io](https://app.timelyn.io)

## Contributing

I'm always on the look out for collaborators so feel free to suggest new features, get in touch or just fork at will.

### Install

To install the backend clone the repository, modify the config files to suit your environment then follow the getting started information in the [sails documentation](https://github.com/balderdashy/sails-docs/blob/master/getting-started/getting-started.md).
