#! /bin/bash
FOLDER1=$1
FOLDER2=$2

FILES=`ls $FOLDER1/*.txt | xargs -n 1 basename`

for FILE in $FILES
do
  echo "`diff -c $FOLDER1/$FILE $FOLDER2/$FILE`"
done
