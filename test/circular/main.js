import foo from './foo';

// true in dev, false in production
window.circularWorks = foo.getBar().getFoo() === foo;
