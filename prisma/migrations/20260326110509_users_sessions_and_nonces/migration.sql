-- CreateTable
CREATE TABLE "USERS" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "api_secret_encrypted" TEXT NOT NULL,
    "api_secret_iv" TEXT NOT NULL,
    "api_secret_auth_tag" TEXT NOT NULL,
    "failed_loggin_attempts" INTEGER NOT NULL DEFAULT 0,
    "last_login_at" TIMESTAMP(3) NOT NULL,
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
    "login_ip" TEXT NOT NULL,
    "user_agent" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "last_activity_at" TIMESTAMP(3) NOT NULL,
    "revoked" BOOLEAN NOT NULL DEFAULT false,
    "revoked_reason" TEXT NOT NULL,
    "revoked_at" TIMESTAMP(3),

    CONSTRAINT "SESSIONS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "REQUEST_NONCES" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "id_user" UUID NOT NULL,
    "nonce" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "REQUEST_NONCES_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AUDIT_LOGS" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "id_user" UUID NOT NULL,
    "action" TEXT NOT NULL,
    "ip_address" TEXT NOT NULL,
    "user_agent" TEXT NOT NULL,
    "metadata" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AUDIT_LOGS_pkey" PRIMARY KEY ("id")
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
CREATE INDEX "SESSIONS_login_ip_idx" ON "SESSIONS"("login_ip");

-- CreateIndex
CREATE INDEX "SESSIONS_user_agent_idx" ON "SESSIONS"("user_agent");

-- CreateIndex
CREATE UNIQUE INDEX "REQUEST_NONCES_nonce_key" ON "REQUEST_NONCES"("nonce");

-- CreateIndex
CREATE INDEX "REQUEST_NONCES_id_user_idx" ON "REQUEST_NONCES"("id_user");

-- CreateIndex
CREATE INDEX "REQUEST_NONCES_nonce_idx" ON "REQUEST_NONCES"("nonce");

-- CreateIndex
CREATE INDEX "AUDIT_LOGS_id_user_idx" ON "AUDIT_LOGS"("id_user");

-- CreateIndex
CREATE INDEX "AUDIT_LOGS_action_idx" ON "AUDIT_LOGS"("action");

-- AddForeignKey
ALTER TABLE "SESSIONS" ADD CONSTRAINT "SESSIONS_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "USERS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "REQUEST_NONCES" ADD CONSTRAINT "REQUEST_NONCES_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "USERS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AUDIT_LOGS" ADD CONSTRAINT "AUDIT_LOGS_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "USERS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
