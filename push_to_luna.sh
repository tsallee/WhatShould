#!/bin/bash
tar -cvzf crowdsource.tar.gz crowdsource
scp crowdsource.tar.gz luna.mines.edu:/srv/csci_445/2013_fall/team10
ssh luna.mines.edu 'chmod -R 777 /srv/csci_445/2013_fall/team10/crowdsource; rm -r /srv/csci_445/2013_fall/team10/crowdsource; tar -xvzf /srv/csci_445/2013_fall/team10/crowdsource.tar.gz -C /srv/csci_445/2013_fall/team10; chmod -R 777 /srv/csci_445/2013_fall/team10/crowdsource; rm -f /srv/csci_445/2013_fall/team10/crowdsource.tar.gz'
rm -f crowdsource.tar.gz
firefox http://luna.mines.edu/csci_445/2013_fall/team10/crowdsource/
