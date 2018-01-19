# Since this project is a dependecy, we should simulate the testing inside a another angular app, and make sure
# this is working so far fine.

# We assume that angular-cli is globally installed.
# We are not cloning existing projects, we build with latest version of angular-cli
# and install this dependency


# Create a workspace for project
cd /tmp/;
rm -rf ng4;
# Install
ng new ng4