# …or create a new repository on the command line
echo "# shijiuhu1" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/shijiuhu/shijiuhu1.git
git push -u origin main

# …or push an existing repository from the command line
git remote add origin https://github.com/shijiuhu/shijiuhu1.git
git branch -M main
git push -u origin main

# …or import code from another repository
You can initialize this repository with code from a Subversion, Mercurial, or TFS project.

# ---------------------------------------------------------------------------------
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# -----------------------------------------------------------------------
# 这是我第一次提交时候的git bash内容：
yangtao@DESKTOP-BM4RNSJ MINGW64 /d/vscodeWorkspace/vue/shijiuhu1 (master)
$ git config --global user.name
coderyt

yangtao@DESKTOP-BM4RNSJ MINGW64 /d/vscodeWorkspace/vue/shijiuhu1 (master)
$ git config --global user.email
2605564305@qq.com

yangtao@DESKTOP-BM4RNSJ MINGW64 /d/vscodeWorkspace/vue/shijiuhu1 (master)
$ git init
Reinitialized existing Git repository in D:/vscodeWorkspace/vue/shijiuhu1/.git/

yangtao@DESKTOP-BM4RNSJ MINGW64 /d/vscodeWorkspace/vue/shijiuhu1 (master)
$ git add .
warning: LF will be replaced by CRLF in README.md.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in package-lock.json.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in package.json.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in public/index.html.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in src/App.vue.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in src/main.js.
The file will have its original line endings in your working directory

yangtao@DESKTOP-BM4RNSJ MINGW64 /d/vscodeWorkspace/vue/shijiuhu1 (master)
$ git status
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   package-lock.json
        modified:   package.json
        new file:   public/LocalTest.json
        modified:   public/index.html
        new file:   public/test.html
        modified:   src/App.vue
        new file:   src/assets/i18n/en.js
        new file:   src/assets/i18n/zh.js
        new file:   src/assets/img/11.png
        new file:   src/assets/img/1_yagushouFly.jpg
        new file:   src/assets/img/2_yagushouSmall.jpg
        new file:   src/assets/img/background.png
        new file:   src/assets/img/email.png
        new file:   src/assets/img/favicon.ico
        renamed:    src/assets/logo.png -> src/assets/img/logo.png
        new file:   src/assets/img/password.png
        new file:   src/assets/img/spicLogo.png
        new file:   src/assets/json/UserInfo.json
        new file:   src/components/Apple.vue
        deleted:    src/components/HelloWorld.vue
        new file:   src/components/Home.vue
        new file:   src/components/Login.vue
        new file:   src/components/Orange.vue
        new file:   src/components/QuestionNaire.vue
        new file:   src/components/Test.vue
        new file:   src/i18n/index.js
        modified:   src/main.js
        new file:   src/network/index.js
        new file:   src/router/index.js


yangtao@DESKTOP-BM4RNSJ MINGW64 /d/vscodeWorkspace/vue/shijiuhu1 (master)
$ git commit -m '我自己的项目第一次提交'
[master 921b027] 我自己的项目第一次提交
 29 files changed, 1728 insertions(+), 165 deletions(-)
 create mode 100644 public/LocalTest.json
 create mode 100644 public/test.html
 rewrite src/App.vue (69%)
 create mode 100644 src/assets/i18n/en.js
 create mode 100644 src/assets/i18n/zh.js
 create mode 100644 src/assets/img/11.png
 create mode 100644 src/assets/img/1_yagushouFly.jpg
 create mode 100644 src/assets/img/2_yagushouSmall.jpg
 create mode 100644 src/assets/img/background.png
 create mode 100644 src/assets/img/email.png
 create mode 100644 src/assets/img/favicon.ico
 rename src/assets/{ => img}/logo.png (100%)
 create mode 100644 src/assets/img/password.png
 create mode 100644 src/assets/img/spicLogo.png
 create mode 100644 src/assets/json/UserInfo.json
 create mode 100644 src/components/Apple.vue
 delete mode 100644 src/components/HelloWorld.vue
 create mode 100644 src/components/Home.vue
 create mode 100644 src/components/Login.vue
 create mode 100644 src/components/Orange.vue
 create mode 100644 src/components/QuestionNaire.vue
 create mode 100644 src/components/Test.vue
 create mode 100644 src/i18n/index.js
 create mode 100644 src/network/index.js
 create mode 100644 src/router/index.js

yangtao@DESKTOP-BM4RNSJ MINGW64 /d/vscodeWorkspace/vue/shijiuhu1 (master)
$ git remote add https://github.com/shijiuhu/shijiuhu1
usage: git remote add [<options>] <name> <url>

    -f, --fetch           fetch the remote branches
    --tags                import all tags and associated objects when fetching
                          or do not fetch any tag at all (--no-tags)
    -t, --track <branch>  branch(es) to track
    -m, --master <branch>
                          master branch
    --mirror[=(push|fetch)]
                          set up remote as a mirror to push to or fetch from


yangtao@DESKTOP-BM4RNSJ MINGW64 /d/vscodeWorkspace/vue/shijiuhu1 (master)
$ git branch -M main

yangtao@DESKTOP-BM4RNSJ MINGW64 /d/vscodeWorkspace/vue/shijiuhu1 (main)
$ git remote add origin https://github.com/shijiuhu/shijiuhu1.git

yangtao@DESKTOP-BM4RNSJ MINGW64 /d/vscodeWorkspace/vue/shijiuhu1 (main)
$ git push -u origin main
Enumerating objects: 57, done.
Counting objects: 100% (57/57), done.
Delta compression using up to 4 threads
Compressing objects: 100% (51/51), done.
Writing objects: 100% (57/57), 456.06 KiB | 5.70 MiB/s, done.
Total 57 (delta 3), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (3/3), done.
To https://github.com/shijiuhu/shijiuhu1.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.

yangtao@DESKTOP-BM4RNSJ MINGW64 /d/vscodeWorkspace/vue/shijiuhu1 (main)
$

 

