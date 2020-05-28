# Change these four parameters as needed
ACI_PERS_RESOURCE_GROUP=remark42group
ACI_PERS_STORAGE_ACCOUNT_NAME=remark42storage$RANDOM
ACI_PERS_LOCATION=southeastasia
ACI_PERS_SHARE_NAME=acishare

# Create the storage account with the parameters
az storage account create \
    --resource-group $ACI_PERS_RESOURCE_GROUP \
    --name $ACI_PERS_STORAGE_ACCOUNT_NAME \
    --location $ACI_PERS_LOCATION \
    --sku Standard_LRS

# Create the file share
az storage share create \
  --name $ACI_PERS_SHARE_NAME \
  --account-name $ACI_PERS_STORAGE_ACCOUNT_NAME

STORAGE_KEY=$(az storage account keys list --resource-group $ACI_PERS_RESOURCE_GROUP --account-name $ACI_PERS_STORAGE_ACCOUNT_NAME --query "[0].value" --output tsv)
echo $STORAGE_KEY

az container create \
  --resource-group $ACI_PERS_RESOURCE_GROUP \
  --name remark42 \
  --image patarapolw/remark42:dev \
  --dns-name-label aci-remark42 \
  --ports 80 \
  --azure-file-volume-account-name $ACI_PERS_STORAGE_ACCOUNT_NAME \
  --azure-file-volume-account-key $STORAGE_KEY \
  --azure-file-volume-share-name $ACI_PERS_SHARE_NAME \
  --azure-file-volume-mount-path /srv/var \
  --environment-variables REMARK_URL=https://remark.polv.cc SITE=remark,polv SECRET=JL6ijGxxBsSU4nTPwb3zOP2rkfUaKC3J STORE_BOLT_PATH=/srv/var/db BACKUP_PATH=/srv/var/backup AUTH_GOOGLE_CID=419365966603-dtgftlauu1v876pcbtki5j2j6ddf98f5.apps.googleusercontent.com AUTH_GOOGLE_CSEC=xWMm750TvyqnXhBJifGIwnso ADMIN_PASSWD=VrN5ONJMnTtBdpcFZHnMGWnr3HiX524p TIME_ZONE=Asia/Bangkok SSL_TYPE=auto SSL_ACME_EMAIL=polv@polv.cc IMAGE_PROXY_HTTP2HTTPS=true
