DATE=`date`
pg_dump boltbackend -U fairnightzz -h localhost > "template-$(echo "$DATE").sql"
