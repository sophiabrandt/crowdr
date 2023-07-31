<br />
<div align="center">
  <a href="https://github.com/sophiabrandt/crowdr">
    <img src="assets/images/logo.svg" alt="appreciation logo" width="100" height="100">
  </a>
</div>

# crowdr

The idea behind crowdr is to serve as a Next.js playground to explore the new Next.js 13 features.

crowdr is a tool for tracking, managing, and viewing crowdfunding projects that users have supported. The application is built using [Next.js](https://nextjs.org) and [Prisma](https://www.prisma.io/).

⚠ _crowdr is a proof of concept._

I found the original inspiration in the [FrontendMasters Next.js course by Scott Moss](https://frontendmasters.com/courses/fullstack-app-next-v2/dashboard-home-page/), but I significantly rewrote the code and changed the architeture to allow for testing.

Some of the changes include:

- strict type checking (TypeScript)
- architecture changes & refactoring
- unit testing with [jest](https://jestjs.io) & [testing library](https://testing-library.com/)
- parallel data fetching for the home page with Suspense boundaries
- Alert & Modal Dialogs without external dependencies
- ability to add a reward to a project
- bug fixes and minimally adjusted styling

The logo comes from [undraw](https://undraw.co/). 🩷

## Getting Started

### Prerequisites

Ensure that you have the following installed on your local development machine:

- [Node.js](https://nodejs.org/en/) >= 12.x
- [pnpm](https://pnpm.io)
- [docker compose](https://docs.docker.com/compose/)

### Installation

First, clone the repository:

```bash
git clone https://github.com/sophiabrandt/crowdr.git
cd crowdr
```

Then, install the dependencies:

```bash
pnpm install
```

Copy the environment variables file (and add the correct values for your use caes):

```bash
cp env.example .env
```

Start docker container:

```bash
docker compose up
```

Run migrations:

```bash
pnpm exec prisma migrate dev
```

Finally, you can start the development server:

```bash
pnpm dev
```

The application should now be running at `http://localhost:3000`.

## Testing

This project uses Jest for testing. To run the tests:

```bash
pnpm test
```
