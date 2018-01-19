# Since this project is a dependecy, we should simulate the testing inside a another angular app, and make sure
# this is working so far fine.

# We assume that angular-cli is globally installed.
# We are not cloning existing projects, we build with latest version of angular-cli
# and install this dependency


# Get the latest version of amazing-time-picker
# For a pull request, you can copy the amazing-time-picker/dist to /tmp/

# -------------------------- Use for independent of Travis
# cd /tmp/;
# rm -rf amazing-time-picker;
# git clone https://github.com/owsolutions/amazing-time-picker --depth=1;
# cd amazing-time-picker;
# npm install;
# npm run build;
# npm run packagr;
# ---------------------------- End

# Now you have the package ready at:
# /tmp/amazing-time-picker/dist
# Prepare the test beds;
npm run packagr;
cd /tmp/;
git clone https://github.com/owsolutions/amazing-time-picker-test-beds --depth=1
cd amazing-time-picker-test-beds;

cd ng4-test-bed;
npm install;
npm install /tmp/amazing-time-picker/dist;
npm run build;

cd ../ng5-test-bed;
npm install;
npm install /tmp/amazing-time-picker/dist;
npm run build;

echo "Now we have lifted all test beds!";
