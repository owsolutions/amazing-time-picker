# Since this project is a dependecy, we should simulate the testing inside a another angular app, and make sure
# this is working so far fine.

# We assume that angular-cli is globally installed.
# We are not cloning existing projects, we build with latest version of angular-cli
# and install this dependency
set -e;

npm run packagr;
cd /tmp/;
git clone https://github.com/owsolutions/amazing-time-picker-test-beds --depth=1
cd amazing-time-picker-test-beds;

cd ng4-test-bed;
npm install;
npm install ${TRAVIS_BUILD_DIR}/dist;
echo ${TRAVIS_BUILD_DIR}/dist;
ls -la ${TRAVIS_BUILD_DIR}/dist;
npm run build;

cd ../ng5-test-bed;
npm install;
npm install ${TRAVIS_BUILD_DIR}/dist;
npm run build;

echo "Now we have lifted all test beds!";
cd $TRAVIS_BUILD_DIR;