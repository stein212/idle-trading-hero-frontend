#!/bin/sh

set -e

# https://github.com/redhat-developer/rh-che/issues/337
echo '/usr/bin/ssh-keygen -A'
/usr/bin/ssh-keygen -A

# for azure ssh
echo 'starting ssh...'
/usr/sbin/sshd

echo "running yarn serve"
yarn serve