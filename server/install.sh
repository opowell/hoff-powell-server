#!/bin/sh -e
plist_path="localhost.jas.plist"
plist_filename=$(basename "$plist_path")
install_path="/Users/play/Library/LaunchAgents/$plist_filename"

echo "installing launchctl plist: $plist_path --> $install_path"
cp -f "$plist_path" "$install_path"
# sudo chown op "$install_path"
# sudo chmod 644 "$install_path"

launchctl unload "$install_path"
launchctl load "$install_path"

echo "to check if it's running, run this command: sudo launchctl list | grep jas"
echo "to uninstall, run this command: sudo launchctl unload \"$install_path\""