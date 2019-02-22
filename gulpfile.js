const gulp = require("gulp");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");

const i18nextParser = require("i18next-parser").gulp;

gulp.task("i18next", function() {
  gulp
    .src("src/**")
    .pipe(
      new i18nextParser({
        locales: ["en", "ru"],
        output: "public/locales/$LOCALE/$NAMESPACE.json"
      })
    )
    .pipe(gulp.dest("./"));
});
