-- CreateTable
CREATE TABLE "USERS" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "public_key" TEXT NOT NULL,
    "encrypted_private_key" TEXT NOT NULL,
    "private_key_iv" TEXT NOT NULL,
    "private_key_auth_tag" TEXT NOT NULL,
    "failed_loggin_attempts" INTEGER NOT NULL DEFAULT 0,
    "account_locked_until" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "USERS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SESSIONS" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "id_user" UUID NOT NULL,
    "token_hash" TEXT NOT NULL,
    "fingerprint_hash" TEXT NOT NULL,
    "ip_address" TEXT NOT NULL,
    "user_agent" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "revoked_at" TIMESTAMP(3),

    CONSTRAINT "SESSIONS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ENTRIES" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "id_user" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "encrypted_data_key" TEXT NOT NULL,
    "cipher_text" TEXT NOT NULL,
    "iv" TEXT NOT NULL,
    "auth_tag" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ENTRIES_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "USERS_email_key" ON "USERS"("email");

-- CreateIndex
CREATE INDEX "USERS_email_idx" ON "USERS"("email");

-- CreateIndex
CREATE INDEX "SESSIONS_id_user_idx" ON "SESSIONS"("id_user");

-- CreateIndex
CREATE INDEX "SESSIONS_token_hash_idx" ON "SESSIONS"("token_hash");

-- CreateIndex
CREATE INDEX "SESSIONS_fingerprint_hash_idx" ON "SESSIONS"("fingerprint_hash");

-- CreateIndex
CREATE INDEX "SESSIONS_ip_address_idx" ON "SESSIONS"("ip_address");

-- CreateIndex
CREATE INDEX "SESSIONS_user_agent_idx" ON "SESSIONS"("user_agent");

-- CreateIndex
CREATE INDEX "ENTRIES_id_user_idx" ON "ENTRIES"("id_user");

-- CreateIndex
CREATE INDEX "ENTRIES_title_idx" ON "ENTRIES"("title");

-- AddForeignKey
ALTER TABLE "SESSIONS" ADD CONSTRAINT "SESSIONS_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "USERS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ENTRIES" ADD CONSTRAINT "ENTRIES_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "USERS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
