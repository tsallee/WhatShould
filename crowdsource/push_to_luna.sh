#!/bin/bash

tar -cvzf crowdsource.tar.gz src
scp crowdsource.tar.gz luna.mines.edu:/srv/csci_445/2013_fall/team10
ssh luna.mines.edu 'tar -xvzf /srv/csci_445/2013_fall/team10/crowdsource.tar.gz'
ssh luna.mines.edu 'rm -f /srv/csci_445/2013_fall/team10/crowdsource.tar.gz'
#rm -f crowdsource.tar.gz