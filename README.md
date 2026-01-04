# PRWT

<p align="center">
  <img src="client/src/assets/images/PRWT_Logo_Banner.png" alt="PRWT_full_logo"/>
</p>

Phrase Ranker With Template

This program is a simple yet powerful text-based entry voting platform.
You can use it for listing anything !
Few ranking ideas: websites, software, names, quotes, jokes, for now, anything that's unformatted (at least for now) text based is doable!

An important note is that it uses OAuth2 and ONLY discord as of now, this is a independent choice, we will consider adding options in the future.

---

## Requirements

### For local development

- Node.js **25**
- npm **11**
- Angular CLI **20**
- PocketBase

### For containerized setup

- Docker

## Run locally

```sh
cd client
npm run start
npm run pb
```

- Open http://localhost:4200 for the Angular frontend
- Open http://localhost:8090/\_/ for the PocketBase admin panel

## Run with Docker

```sh
docker compose up
```

Open http://localhost:8080

## Reporting Issues

If you encounter any issues while using PRWT, please report them by creating a new issue on this GitHub repository. Provide as much detail as possible to help us understand and resolve the problem.

## Contributing

Feel free to submit feature requests using issues or do your own pull request.

## FAQ

### The name is really difficult to say...

No need to say P R W T each times, just call it `pʁut` !

## Thanksies

Thanks to my girlfriend [@frezlotte](https://github.com/frezlotte) for contributing, testing and supporting this project!
